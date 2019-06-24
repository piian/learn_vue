class Errors {
    constructor() {
        this.errors = {}
    }

    /**
     * 是否有该项错误
     *
     * @param {*} field
     * @returns
     * @memberof Errors
     */
    has(field) {
        return this.errors.hasOwnProperty(field)
    }

    /**
     * 检测是否存在任何错误
     *
     * @returns
     * @memberof Errors
     */
    any() {
        return Object.keys(this.errors).length > 0
    }

    /**
     * 获取错误的内容
     *
     * @param {*} field
     * @returns
     * @memberof Errors
     */
    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0]
        }
    }

    /**
     * 赋值错误到自身
     *
     * @param {*} errors
     * @memberof Errors
     */
    record(errors) {
        this.errors = errors
    }

    /**
     * 清理错误
     *
     * @param {*} field
     * @memberof Errors
     */
    clear(field) {
        if (field) {
            delete this.errors[field]
            return
        }
        this.errors = {}
    }
}

class Form {
    /**
     * 构造函数，初始化errors
     * @param {*} data
     * @memberof Form
     */
    constructor(data) {
        this.originalData = data

        for (const field in data) {
            this[field] = data[field]
        }

        this.errors = new Errors()
    }

    /**
     * 获取提交的数据
     *
     * @returns
     * @memberof Form
     */
    data() {
        let data = Object.assign({}, this)

        delete data.originalData
        delete data.errors

        return data
    }

    /**
     * formdata的方式
     *
     * @returns
     * @memberof Form
     */
    data2() {
        let data = new FormData()

        for (let field in this.originalData) {
            data.append(field, this[field])
        }
        return data
    }


    /**
     * 重置表单
     *
     * @memberof Form
     */
    reset() {

        for (const field in this.originData) {
            this[field] = '';
        }
    }

    /**
     * 提交表单
     *
     * @param {*} requestType
     * @param {*} url
     * @memberof Form
     */
    submit(requestType, url) {
        axios[requestType](url, this.data2())
            .then(this.onSuccess.bind(this))
            .catch(this.onFail.bind(this))
    }

    /**
     * 成功回调
     *
     * @param {*} response
     * @memberof Form
     */
    onSuccess(response) {
        alert(response.data.message)

        this.errors.clear()

        this.reset()
    }

    /**
     * 失败回调
     *
     * @param {*} errors
     * @memberof Form
     */
    onFail(errors) {
        this.errors.record(errors.response.data)
    }
}

