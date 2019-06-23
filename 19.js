class Errors {
    constructor(){
        this.errors = {}
    }

    // 是否有该项错误
    has(field){
        return this.errors.hasOwnProperty(field)
    }

    // 检测是否存在任何错误
    any(){
        return Object.keys(this.errors).length > 0
    }

    // 获取错误的内容
    get(field){
        if(this.errors[field]){
            return this.errors[field][0]
        }
    }

    // 赋值错误到自身
    record(errors){
        this.errors = errors
    }

    // 清理错误
    clear(field){
        if(field){
            delete this.errors[field]
            return 
        }
        this.errors = {}
    }
}

class Form{
    constructor(data){
        this.originalData = data
    }
}