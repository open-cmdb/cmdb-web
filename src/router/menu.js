
const _import = require('./_import_' + process.env.NODE_ENV)

export const menu = [
    {
        path: "data",
        name: "data",
        component: _import("display-data/DisplayData"),
        meta: {
            name: " 主 页",
            icon: "fa-home",
            permissions: []
        }
    },
    {
        path: "deleted",
        name: "deleted",
        component: _import("deleted-display/DisplayData"),
        meta: {
            name: " 已删除",
            icon: "fa-recycle",
            permissions: []
        }
    },
    {
        path: "table-mgmt",
        name: "table-mgmt",
        component: _import("table-mgmt/TableMgmt"),
        meta: {
            name: " 表管理",
            icon: "fa-table",
            permissions: ["admin"]
        }
    },
    {
        path: "user-mgmt",
        name: "user-mgmt",
        component: _import("user-mgmt/UserMgmt"),
        meta: {
            name: " 用户管理",
            icon: "fa-users",
            permissions: ["admin"]
        }
    }
]