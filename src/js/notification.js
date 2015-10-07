var React = require('react');


var NotificationPanel = React.createClass({
    clearChecked: function () {
        this.props.data.forEach(function (department, index) {
            this.refs[this.getDepartmentRef(index)].setChecked(false);
        }.bind(this));
    },

    getDepartmentRef: function (index) {
        return 'dept-' + index;
    },

    render: function () {
        return (
            <div>
                <div className='notification-head'>
                    <span>招聘职位</span>
                    <span className='right' onClick={this.clearChecked}>清空</span>
                </div>

                <div className='notification-body'>
                    <ul className='department-list'>
                        {
                            this.props.data.map(function (department, index) {
                                return (
                                    <li>
                                        <Department
                                            departmentName={department.departmentName}
                                            positionList={department.positionList}
                                            ref={this.getDepartmentRef(index)}
                                            id={this.getDepartmentRef(index)}
                                            />
                                    </li>
                                );
                            }.bind(this))
                        }
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
            collapsed: true,
        };
    },

    getPositionRef: function (index) {
        return 'pos-' + index;
    },

    setChecked: function (checked) {
        this.props.positionList.forEach(function (position, index) {
            this.refs[this.getPositionRef(index)].setChecked(checked);
        }.bind(this));
        this.setState({
            checked: checked
        });
    },

    toggleChecked: function () {
        this.setChecked(!this.state.checked);
    },

    updateChecked: function () {
        var allChecked = this.props.positionList.every(function(position, index) {
            return this.refs[this.getPositionRef(index)].state.checked;
        }.bind(this));
        this.setState({
            checked: allChecked
        });
    },

    toggleCollapsed: function () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    },

    render: function () {
        var notificationSum = this.props.positionList.reduce(function (sum, position) {
            return sum + position.notificationCount;
        }, 0);

        var collapsedIcon = {
            true: 'icon-chevron-right',
            false: 'icon-chevron-down'
        }[this.state.collapsed];

        var checkedIcon = {
            true: 'icon-check',
            false: 'icon-check-empty'
        }[this.state.checked];

        var checkedClass = {
            true: 'checked',
            false: ''
        }[this.state.checked];

        return (
            <div className={'department ' + checkedClass}>
                <div className='department-head'>
                    <input
                        id={this.props.id}
                        type='checkbox'
                        checked={this.state.checked}
                        onChange={this.toggleChecked}
                        />
                    <label htmlFor={this.props.id}><i className={checkedIcon}></i></label>

                    <div className='department-toggle inline-block' onClick={this.toggleCollapsed}>
                        <span>{this.props.departmentName}</span>
                        <i className={collapsedIcon}></i>
                    </div>

                    <div className='count padded'>{notificationSum}</div>
                </div>

                <div className={'department-body' + (this.state.collapsed ? ' collapsed' : '')}>
                    <ul>
                        {
                            this.props.positionList.map(function (position, index) {
                                return (
                                    <li>
                                        <Position
                                            positionName={position.positionName}
                                            notificationCount={position.notificationCount}
                                            checked={position.checked}
                                            ref={this.getPositionRef(index)}
                                            id={this.props.id + '-' + this.getPositionRef(index)}
                                            updateParentChecked={this.updateChecked}
                                            />
                                    </li>
                                );
                            }.bind(this))
                        }
                    </ul>
                </div>
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

    componentDidUpdate: function(prevProps, prevState) {
        if (prevState.checked !== this.state.checked) {
            this.props.updateParentChecked();
        }
    },

    toggleChecked: function () {
        this.setChecked(!this.state.checked);
    },

    setChecked: function (checked) {
        this.setState({
            checked: checked
        });
    },

    render: function () {
        var checkedIcon = {
            true: 'icon-check',
            false: 'icon-check-empty'
        }[this.state.checked];

        return (
            <div className={'position' + (this.state.checked ? ' checked' : '')}>
                <input
                    id={this.props.id}
                    type='checkbox'
                    checked={this.state.checked}
                    onChange={this.toggleChecked}
                    />
                <label htmlFor={this.props.id}><i className={checkedIcon}></i></label>

                <div className='inline-block'>
                    <span>{this.props.positionName}</span>
                </div>

                <div className='count'>{this.props.notificationCount}</div>
            </div>
        );
    }
});

module.exports = NotificationPanel;