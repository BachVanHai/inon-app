/* 
    Đây là tool để add một key-value pair nào đó được 
    auto append vào trong cả 2 file vi.json và en.json cùng một lúc
    Cách sử dụng: Đứng ở thư mục root của project gõ lệnh: npm run set-trans
*/

const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const objRegex = /\{("[\w\.\s]+"\s*\:\s*".+")\}/g
const numberRegex = /^\d+$/
const FgRed = "\x1b[31m"
const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgBlack = "\x1b[30m"

bigLog("----- Tool tự động add cặp key-value cho file translate.json - ver: 1.0.5 -----", FgGreen)
main()

function search() {
    const defaulVi = JSON.parse(fs.readFileSync(`${__dirname}/vi.json`, { encoding: "utf-8" }))
    const noneAccents = Object.entries(defaulVi).map(([key, value]) => [key, removeAccents(value).toLowerCase()])

    console.log(`Nhập từ (hoặc cụm từ) cần tìm kiếm - (Gõ :b! để back`)
    rl.question(`=> `, function (userStr) {
        if (isSwitchMode(userStr)) return
        if (!userStr || userStr.trim().match(/[!@#$%^&*\\()\]}{?,:"';]/g)) return search()

        const userSearch = removeAccents(userStr).toLowerCase()
        const r = new RegExp(userSearch.replace(/\s+/g, ".*?"), "g")
        let result = []
        noneAccents.forEach(([key, value]) => {
            if (key.toLowerCase().match(r) || value.match(r)) {
                result.push(`${key} : ${defaulVi[key]}`)
            }
        })
        if (result.length === 0) {
            bigLog("Không tìm thấy kết quả!", FgRed)
            return search()
        }
        result.forEach(word => lineLog(word, FgGreen))
        search()
    })
}

function deleteKeyValue() {
    const vi = JSON.parse(fs.readFileSync(`${__dirname}/vi.json`, { encoding: "utf-8" }))
    const en = JSON.parse(fs.readFileSync(`${__dirname}/en.json`, { encoding: "utf-8" }))

    console.log(`Nhập key cần delete trong file vi.json và en.json - (Gõ :b! để back hoặc :4! để vào mục 4 trong menu)`)
    rl.question('=> ', function (userStr) {
        if (isSwitchMode(userStr)) return
        if (!userStr || userStr.trim().match(/[!@#$%^&*\\()\]}{?,:"';]/g)) return search()
        if (!vi[userStr]) {
            bigLog("Key bạn vừa nhập không tồn tại", FgRed)
            deleteKeyValue()
            return
        }
        delete vi[userStr]
        delete en[userStr]
        try {
            fs.writeFileSync(`${__dirname}/vi.json`, JSON.stringify(vi, null, 2))
            fs.writeFileSync(`${__dirname}/en.json`, JSON.stringify(en, null, 2))
            bigLog("Đã delete thành công trong vi.json và en.json!", FgGreen)
        } catch (err) {
            console.error(err)
        }
        main()
    })
}

function updateKeyValue() {
    const vi = JSON.parse(fs.readFileSync(`${__dirname}/vi.json`, { encoding: "utf-8" }))
    const en = JSON.parse(fs.readFileSync(`${__dirname}/en.json`, { encoding: "utf-8" }))

    console.log(`Nhập json cần update lên file vi.json và en.json - (Gõ :b! để back hoặc :4! để vào mục 4 trong menu)`)
    rl.question('=> ', function (userStr) {
        if (isSwitchMode(userStr)) return
        if (!userStr || !userStr.toString().match(objRegex)) {
            bigLog("Object bạn vừa nhập sai cú pháp!", FgRed)
            updateKeyValue()
            return
        }
        const userObj = JSON.parse(userStr, { encoding: "utf-8" })
        for (let prop of Object.keys(userObj)) {
            if (!vi[prop]) {
                bigLog("Key bạn vừa nhập không tồn tại", FgRed)
                updateKeyValue()
                return
            }
            vi[prop] = userObj[prop]
            en[prop] = userObj[prop]
        }
        try {
            fs.writeFileSync(`${__dirname}/vi.json`, JSON.stringify(vi, null, 2))
            fs.writeFileSync(`${__dirname}/en.json`, JSON.stringify(en, null, 2))
            bigLog("Đã update thành công vào vi.json và en.json!", FgGreen)
        } catch (err) {
            console.error(err)
        }
        main()
    })
}

function addKeyValue() {
    const vi = JSON.parse(fs.readFileSync(`${__dirname}/vi.json`, { encoding: "utf-8" }))
    const en = JSON.parse(fs.readFileSync(`${__dirname}/en.json`, { encoding: "utf-8" }))

    console.log(`Nhập 1 json obj {"key":"value"} cần append vào file vi.json và en.json - (Gõ :b! để back hoặc :4! để vào mục 4 trong menu)`)
    rl.question('=> ', function (userStr) {
        if (isSwitchMode(userStr)) return
        if (!userStr || !userStr.toString().match(objRegex)) {
            bigLog("Object bạn vừa nhập sai cú pháp!", FgRed)
            addKeyValue()
            return
        }
        const userObj = JSON.parse(userStr, { encoding: "utf-8" })
        for (let prop of Object.keys(userObj)) {
            if (vi[prop]) {
                bigLog("Trường bạn vừa nhập có key bị trùng!", FgYellow)
                addKeyValue()
                return
            }
        }
        try {
            fs.writeFileSync(`${__dirname}/vi.json`, JSON.stringify({ ...vi, ...userObj }, null, 2))
            fs.writeFileSync(`${__dirname}/en.json`, JSON.stringify({ ...en, ...userObj }, null, 2))
            bigLog("Đã ghi thành công lên vi.json và en.json!", FgGreen)
        } catch (err) {
            console.error(err)
        }
        main()
    })
}

function main() {
    rl.question(`Vui lòng nhập số trên bàn phím để chọn
    1. Thêm cặp key-value
    2. Sửa cặp key-value
    3. Xóa cặp key-value
    4. Tìm kiếm cặp key-value
    5. Đóng chương trình
     => `,
        (userInput) => {
            if (userInput && !userInput.match(numberRegex)) {
                bigLog("Bạn cần nhập số", FgRed)
                return main()
            }
            const _userInput = Number(userInput)
            switch (_userInput) {
                case 1:
                    addKeyValue()
                    break
                case 2:
                    updateKeyValue()
                    break
                case 3:
                    deleteKeyValue()
                    break
                case 4:
                    search()
                    break
                case 5:
                    rl.close()
                    break
                default:
                    bigLog("Trường bạn vừa nhập sai cú pháp!", FgRed)
                    main()
                    break
            }
        })
}
function lineLog(msg, color = FgGreen) {
    console.log(`${color}%s\x1b[0m`, `${msg}`)
}
function bigLog(msg, color = FgBlack) {
    console.log(`${color}%s\x1b[0m`, "----------")
    console.log(`${color}%s\x1b[0m`, `${msg}`)
    console.log(`${color}%s\x1b[0m`, "----------")
}

function isSwitchMode(userStr) {
    if (!userStr) return false
    const userCommand = userStr.trim()
    switch (userCommand) {
        case ":b!":
            main()
            return true
        case ":1!":
            addKeyValue()
            return true
        case ":2!":
            updateKeyValue()
            return true
        case ":3!":
            deleteKeyValue()
            return true
        case ":4!":
            search()
            return true
        case ":q!":
            rl.close()
            return true
        default:
            return false
    }

}

function removeAccents(rawStr) {
    let _str = `${rawStr}`
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"
    ]
    for (let i = 0; i < AccentsMap.length; i++) {
        let re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
        let char = AccentsMap[i][0]
        _str = _str.replace(re, char)
    }
    return _str
}

rl.on("close", function () {
    bigLog("Chào tạm biệt!", FgGreen)
    process.exit(0)
})
