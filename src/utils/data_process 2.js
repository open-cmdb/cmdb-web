
export const add_status_fields = (item) => {
    item.__editing = false
    item.__loading = false
    item.__loading1 = false
    item.__loading2 = false
    item.__loading3 = false
    item.__loading4 = false
    item.__loading_delete = false
    return item
}

export const add_format_dt_fields = (item, fields=[]) => {
    fields.forEach(field => {
        item[`${field}_format`] = item[field] ? item[field].substr(0, 16) : item[field]
    })
    return item
}

export const list_to_string = (data) => {
    for (let key in data){
        if(data[key] instanceof Array){
            data[key] = data[key].join("、")
        }
    }
    return data
}