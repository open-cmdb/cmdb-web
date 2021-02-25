
const convert_to_filter = (dict) => {
    var ret = []
    for(let i in dict){
        ret.push({value: i, text: dict[i].label, label: dict[i].label})
    }
    return ret
}

export const STATUS = {
    99: {label: "异常", color: "#909398"},
    1: {label: "审批中", color: "#F6BB89"},
    2: {label: "已撤销", color: "#2667A1"},
    3: {label: "被驳回", color: "#EA7788"},
    4: {label: "待接受", color: "#8EA898"},
    5: {label: "已接受", color: "#8EA898"},
    6: {label: "处理中", color: "#584A48"},
    7: {label: "处理失败", color: "#E67470"},
    8: {label: "已完成", color: "#6DB0EA"},
    0: {label: "已确认", color: "#61D0B0"},
}

export const STATUS_FILTERS = convert_to_filter(STATUS)

export default {
    STATUS,
    STATUS_FILTERS
}