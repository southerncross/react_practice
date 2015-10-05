var React = require('react');

var NotificationPanel = React.createClass({
    render: function () {
        var departmentList = this.props.data.map(function (department, index) {
            return (
                <Department
                    id={'dept-' + index}
                    departmentName={department.departmentName}
                    positions={department.positions}
                    />
            );
        });

        return (
            <div>
                <div>
                    <p>招聘职位
                        <span className='right'>清空</span>
                    </p>
                </div>

                <div>
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
        var newChecked = !this.state.checked;
        this.setState({
            checked: newChecked
        });
        this.props.positions.forEach(function (position, index) {
            this.refs['position-' + index].setChecked(newChecked);
        }.bind(this));
    },

    toggleCollapsed: function() {
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
            <li>
                <div className='checkbox'>
                    <input
                        id={this.props.id}
                        type='checkbox'
                        checked={this.state.checked}
                        onChange={this.toggleChecked}
                        />
                    <label htmlFor={this.props.id}><i className={checkedClass[this.state.checked]}></i></label>

                    <span className='department-toggle' onClick={this.toggleCollapsed}>
                        {this.props.departmentName}
                        <i className={collapsedClass[this.state.collapsed]}></i>
                    </span>

                    <span className='right'>{notificationSum}</span>
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
            <li>
                <div className='checkbox'>
                    <input
                        id={this.props.id}
                        type='checkbox'
                        checked={this.state.checked}
                        onChange={this.toggleChecked}
                        />
                    <label htmlFor={this.props.id}><i className={checkedClass[this.state.checked]}></i></label>

                    <span>{this.props.positionName}</span>
                    <span className='right'>{this.props.notificationCount}</span>
                </div>
            </li>
        );
    }
});

module.exports = NotificationPanel;