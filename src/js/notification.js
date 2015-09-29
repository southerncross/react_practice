var React = require('react');

var NotificationPanel = React.createClass({
    render: function () {
        var departments = this.props.data.map(function(department) {
            return <Department departmentName={department.name} positions={department.positions} />
        });

        return (
            <div>
                <p>招聘职位<span>清空</span></p>
                <ul>
                    {departments}
                </ul>
            </div>
        );
    }
});

var Department = React.createClass({
    render: function () {
        var notificationSum = this.props.positions.reduce(function(sum, position) {
            return sum + position.notificationCount;
        }, 0);
        var positions = this.props.positions.map(function(position) {
            return <Position positionName={position.positionName} notificationCount={position.notificationCount} />
        });

        return (
            <li>
                <input type="checkbox"/>
                <p>{this.props.departmentName}<span>{notificationSum}</span></p>
                <ul>
                    {positions}
                </ul>
            </li>

        );
    }
});

var Position = React.createClass({
    render: function () {
        return (
            <li>
                <input type="checkbox"/>
                <p>{this.props.positionName}<span>{this.props.notificationCount}</span></p>
            </li>
        );
    }
});

module.exports = NotificationPanel;