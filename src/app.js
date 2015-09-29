var React = require('react');
var Notification = require('./js/notification.js');

var notifications = [
    {
        departmentName: '工程研发部门',
        positions: [
            {
                positionName: 'Mac 开发工程师',
                notificationCount: 9
            },
            {
                positionName: 'iOS App 测试工程师',
                notificationCount: 17
            }
        ]
    },
    {
        departmentName: '产品设计部门',
        positions: [
            {
                positionName: '网页设计师',
                notificationCount: 47
            },
            {
                positionName: 'ID/工业 设计师',
                notificationCount: 39
            }
        ]
    }
];

React.render(
    <Notification data={notifications} />,
    document.getElementById('notification')
);