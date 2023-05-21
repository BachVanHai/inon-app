import moment from 'moment'
import { useIntl } from 'react-intl'
import { history } from '../../../history'
class Utils {
    static DATE_FORMAT = "YYYY-MM-DD"

    static isObjEmpty(obj) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false
            }
        }
        return true
    }

    static formatCurrency(value) {
        return Number.parseInt(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    static formatDateTime(value) {
        return moment(value, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DDTHH:mm:ss') + "Z"
    }

    static removeSpecialChar(value) {
        return value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    }

    static removeSpecialCharNumberPlate(value) {
        return value.replace(/[^a-zA-Z0-9.-]/g, '')
    }

    static removeSpecialCharCertNo(value) {
        return value.replace(/[^a-zA-Z0-9-/,.]/g, '')
    }

    static removeChar(value) {
        return value.replace(/\D/g, '');
    }

    static removeCharCertWeight(value) {
        var value = value.replace(/[^0-9.]/g, '')
        var index = value.indexOf('.')
        if (index == -1) return value
        var decimal = value.substring(index + 1, value.length)

        if (decimal.length > 3) return value.substring(0, index + 1) + "" + decimal.substring(0, 3)
        return value.substring(0, index + 1) + "" + decimal
    }

    static removeCharBHInc(value) {
        var value = value.replace(/[^0-9.]/g, '')
        var index = value.indexOf('.')
        if (index == -1) return value
        var decimal = value.substring(index + 1, value.length)

        if (decimal.length > 1) return value.substring(0, index + 1) + "" + decimal.substring(0, 1)
        return value.substring(0, index + 1) + "" + decimal
    }

    static removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        str = str.replace(/ + /g, "");
        str = str.replace(" ", "");
        str = str.trim();
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
        return str;
    }

    static useFormatMessage(messageId) {
        return useIntl().formatMessage({ id: messageId })
    }

    static removeNumber(str) {
        return str.replace(/[0-9]/g, '');
    }

    static goBackHome() {
        history.push('/app/home')
    }

    static floatFomat(value) {
        return value && value.toString().replace(/[^0-9.]/g, '')
    }

    static removeSpecialCharAndToUpperCase(value) {
        return value && value.replace(/[`0-9~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    }

    static removeSpecialCharTaxId(value) {
        return value && value.replace(/[^a-zA-Z0-9-]/g, '')
    }

    static removeAmount(str) {
        return str && str.replace(/[0-9]/g, '');
    }
}


export default Utils
