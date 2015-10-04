var React = require('react');

var NotificationPanel = React.createClass({
    render: function () {
        var departments = this.props.data.map(function (department) {
            return <Department departmentName={department.departmentName} positions={department.positions}/>
        });

        return (
            <div>
                <p>招聘职位<span>清空</span></p>

                {departments}
            </div>
        );
    }
});

var Department = React.createClass({
    getInitialState: function () {
        return {
            checked: false
        };
    },

    toggleChecked: function () {
        var newChecked = !this.state.checked;
        this.setState({
            checked: newChecked
        });
        this.props.positions.forEach(function (position, index) {
            this.refs['position-' + index].setChecked(newChecked);
        }.bind(this));
    },

    render: function () {
        var notificationSum = this.props.positions.reduce(function (sum, position) {
            return sum + position.notificationCount;
        }, 0);
        var positions = this.props.positions.map(function (position, index) {
            return <Position
                positionName={position.positionName}
                notificationCount={position.notificationCount}
                checked={position.checked}
                ref={'position-' + index}
                />
        });

        return (
            <div>
                <input
                    type='checkbox'
                    checked={this.state.checked}
                    onChange={this.toggleChecked}
                    />

                {this.props.departmentName}<span></span><span>{notificationSum}</span>

                {positions}
            </div>
        );
    }
});

var Position = React.createClass({
    getInitialState: function () {
        return {
            checked: false
        };
    },

    toggleChecked: function () {
        this.setChecked(!this.state.checked);
    },

    setChecked: function (checked) {
        this.setState({
            checked: checked
        })
    },

    render: function () {
        return (
            <div>
                <input
                    type='checkbox'
                    checked={this.state.checked}
                    onChange={this.toggleChecked}
                    />

                {this.props.positionName}<span>{this.props.notificationCount}</span>
            </div>
        );
    }
});

module.exports = NotificationPanel;