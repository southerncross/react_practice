var React = require('react');
var Notification = require('./js/notification.js');

var notificationList = [
    {
        departmentName: '工程研发部门',
        positionList: [
            {
                positionName: 'Mac 开发工程师',
                notificationCount: 9
            },
            {
                positionName: 'iOS App 测试工程师',
                notificationCount: 17
            },
            {
                positionName: 'Android 远程控制工程师',
                notificationCount: 61
            },
            {
                positionName: 'Web 前端工程师',
                notificationCount: 31
            },
            {
                positionName: 'Android 多媒体软件开发工程师',
                notificationCount: 2
            }
        ]
    },
    {
        departmentName: '产品设计部门',
        positionList: [
            {
                positionName: '网页设计师',
                notificationCount: 47
            },
            {
                positionName: 'ID / 工业设计师',
                notificationCount: 39
            },
            {
                positionName: '视觉设计师 / GUI 设计师',
                notificationCount: 42
            },
            {
                positionName: '平面设计师',
                notificationCount: 8
            }
        ]
    },
    {
        departmentName: '行政部门',
        positionList: [
            {
                positionName: '国家主席',
                notificationCount: 4
            },
            {
                positionName: '全国人大委员会委员长',
                notificationCount: 38
            },
            {
                positionName: '国务院总理',
                notificationCount: 0
            },
            {
                positionName: '全国政协副主席',
                notificationCount: 27
            }
        ]
    },
    {
        departmentName: '其他部门',
        positionList: [
            {
                positionName: '程序员安慰师',
                notificationCount: 13
            },
            {
                positionName: '伙房大妈',
                notificationCount: 9
            },
            {
                positionName: '外卖小哥',
                notificationCount: 3
            },
            {
                positionName: '我也想不出来还有其他什么职位了',
                notificationCount: 123683
            }
        ]
    }
];

React.render(
    <Notification data={notificationList} />,
    document.getElementById('notification')
);