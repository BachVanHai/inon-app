import React from 'react'
import Upload from "./UploadInput"
import * as XLSX from 'xlsx'
import { downloadFile, isArrayEmpty } from '../../../../ultity'
import { Button } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../configs/insurance-app'
/**
 * @description example posible exelData data
[  
    [
        "TEN",
        "NGAY_SINH",
        "GIOI",
        "SO_CMT",
        "PHONE",
        "EMAIL",
        "DCHI",
        "QHE",
        "NGAY_HL",
        "SO_THANG_BH",
        "GOI"
    ],
    [
        "Nguyễn A",
        19880213,
        "NAM",
        "173087543",
        "0987666444",
        "abc\@d.com",
        "Địa chỉ",
        "BT",
        20210320,
        3,
        "GOI3"
    ],
]
@example
    // for upload button
    const toggleFileCallback = (exelData) => {
        const person1 = exelData[1]
        set_something(key_name, person1[0])
        set_something(key_dateOfBirth, person1[1])
        set_something(key_gender, person1[2])
        set_something(key_icNo, person1[3])

        set_something(key_phoneNumber, person1[4])
        set_something(key_email, person1[5])
        set_something(key_address, person1[6])

        set_something(key_relationships, person1[7])
        set_something(key_day_hl, person1[8])
        set_something(key_duration, person1[9])
        set_something(key_package, person1[10])
    }
    // for download button
    const toggleFileCallback = () => {
        let api, fileName = "your-file-name-here"
        // do something
        return [api, fileName]
    }
    return 
       <ExelInput
            type={"UPLOAD"}
            toggleFileCallback={toggleFileCallback}
            msgField={<FormattedMessage id={getKeyLang(`upFile`)} />}
            className="mb-2"
        />
*/

const ExelInput = ({ msgField, toggleFileCallback, type = "UPLOAD", className }) => {
    const TEXT_DUMB = "dumb-text-01010101"
    const default_exelData = [[TEXT_DUMB]]
    const [exelData, setExelData] = React.useState(default_exelData)

    const handleUpload = (e) => {
        e.preventDefault()
        
        var files = e.target.files, f = files[0]
        if (!f) {
            return
        }
        var reader = new FileReader()
        reader.onload = function (e) {
            var data = e.target.result
            let readedData = XLSX.read(data, { type: 'binary' })
            const wsname = readedData.SheetNames[0]
            const ws = readedData.Sheets[wsname]

            let final = [], emptyCount = 0, MAX_EMPTY = 3
            const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 })
            for (let i = 0; i < dataParse.length || emptyCount <= MAX_EMPTY; ++i) {
                if (!isArrayEmpty(dataParse[i]) && dataParse[i][0]) {
                    final.push(dataParse[i])
                } else {
                    emptyCount++
                }
            }
            setExelData(final)
        }
        reader.readAsBinaryString(f)
    }

    React.useEffect(() => {
        if (type === "UPLOAD") {
            if (exelData[0][0] === TEXT_DUMB) return
            toggleFileCallback && toggleFileCallback(exelData)
        }
    }, [JSON.stringify(exelData)])

    return (
        <>
            {
                type === "UPLOAD" ?
                    <Upload
                        className={className} handleChange={handleUpload}
                        msgField={msgField}
                    /> :
                    <Button
                        className={className}
                        tag='label'
                        color='primary'
                        outline
                        onClick={() => {
                            if (!toggleFileCallback) return
                            const [urlFile, fileName] = toggleFileCallback()
                            if (!urlFile) return

                            downloadFile(urlFile, fileName)
                        }}
                    >
                        {msgField || <FormattedMessage id={getKeyLang(`downloadFile`)} />}
                    </Button>
            }

        </>
    )
}

export default ExelInput
