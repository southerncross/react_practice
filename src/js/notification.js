var React = require('react');

var NotificationPanel = React.createClass({
    clearChecked: function() {
        this.props.data.forEach(function(department, index) {
            this.refs['department-' + index].setChecked(false);
        }.bind(this));
    },

    render: function () {
        var departmentList = this.props.data.map(function (department, index) {
            return (
                <Department
                    id={'dept-' + index}
                    departmentName={department.departmentName}
                    positions={department.positions}
                    ref={'department-' + index}
                    />
            );
        });

        return (
            <div>
                <div className='notification-head'>
                    <span>招聘职位</span>
                    <span className='right' onClick={this.clearChecked}>清空</span>
                </div>

                <div className='notification-body'>
                    <ul className='department-list'>
                        {departmentList}
                    </ul>
                </div>
            </div>
        );
    }
});

var Department = React.createClass({
    getInitialState: function () {
        return {
            checked: false,
            collapsed: true
        };
    },

    toggleChecked: function () {
        this.setChecked(!this.state.checked);
    },

    setChecked: function(checked) {
        this.setState({
            checked: checked
        });
        this.props.positions.forEach(function (position, index) {
            this.refs['position-' + index].setChecked(checked);
        }.bind(this));
    },

    toggleCollapsed: function () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    },

    render: function () {
        var notificationSum = this.props.positions.reduce(function (sum, position) {
            return sum + position.notificationCount;
        }, 0);

        var positionList = this.props.positions.map(function (position, index) {
            return (
                <Position
                    id={this.props.id + '-position-' + index}
                    positionName={position.positionName}
                    notificationCount={position.notificationCount}
                    checked={position.checked}
                    ref={'position-' + index}
                    />
            );
        }.bind(this));

        var collapsedClass = {
            true: 'icon-chevron-right',
            false: 'icon-chevron-down'
        };

        var checkedClass = {
            true: 'icon-check',
            false: 'icon-check-empty'
        };

        return (
            <li className='department-item'>
                <div className='checkbox'>
                    <input
                        id={this.props.id}
                        type='checkbox'
                        checked={this.state.checked}
                        onChange={this.toggleChecked}
                        />
                    <label htmlFor={this.props.id}><i className={checkedClass[this.state.checked]}></i></label>

                    <div className='department-toggle inline-block' onClick={this.toggleCollapsed}>
                        <span>{this.props.departmentName}</span>
                        <i className={collapsedClass[this.state.collapsed]}></i>
                    </div>

                    <div className='count padded'>{notificationSum}</div>
                </div>

                <div className={'department-content' + (this.state.collapsed ? ' collapsed' : '')}>
                    <ul className='position-list'>
                        {positionList}
                    </ul>
                </div>
            </li>
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
        var checkedClass = {
            true: 'icon-check',
            false: 'icon-check-empty'
        };

        return (
            <li className='position-item'>
                <div className='checkbox'>
                    <input
                        id={this.props.id}
                        type='checkbox'
                        checked={this.state.checked}
                        onChange={this.toggleChecked}
                        />
                    <label htmlFor={this.props.id}><i className={checkedClass[this.state.checked]}></i></label>

                    <div className='inline-block'>
                        <span>{this.props.positionName}</span>
                    </div>

                    <div className='count'>{this.props.notificationCount}</div>
                </div>
            </li>
        );
    }
});

module.exports = NotificationPanel;