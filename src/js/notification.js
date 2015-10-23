var React = require('react');

function _utmost(number, max) {
    return number > max ? max + '+' : number;
}

var NotificationPanel = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired
    },
    
    getInitialState: function() {
        return {};
    },
    
    clearAllChecked: function () {
        var state = this.state;
        Object.keys(state).forEach(function(deptName) {
            state[deptName] = undefined;
        });
        this.setState(state);
    },

    isDeptChecked: function(deptName) {
        return this.state[deptName] && Object.keys(this.props.data[deptName]).every(function(posName) {
            return this.state[deptName][posName];
        }.bind(this));
    },

    isPosChecked: function(deptName, posName) {
        return this.state[deptName] && this.state[deptName][posName];
    },

    setDeptChecked: function(deptName, checked) {
        Object.keys(this.props.data[deptName]).forEach(function(posName) {
            this.setPosChecked(deptName, posName, checked);
        }.bind(this));
    },

    setPosChecked: function(deptName, posName, checked) {
        var state = this.state;
        state[deptName] = state[deptName] || {};
        state[deptName][posName] = checked;
        this.setState(state);
    },

    toggleDeptChecked: function(deptName) {
        var newChecked = !this.isDeptChecked(deptName);
        this.setDeptChecked(deptName, newChecked);
    },

    togglePosChecked: function(deptName, posName) {
        var newChecked = !this.isPosChecked(deptName, posName);
        this.setPosChecked(deptName, posName, newChecked);
    },

    render: function () {
        var defaultChecked = {};
        var deptList = Object.keys(this.props.data).map(function (deptName) {
            return (
                <li>
                    <Department
                        deptName={deptName}
                        checked={this.isDeptChecked(deptName)}
                        posChecked={this.state[deptName] || defaultChecked}
                        posCount={this.props.data[deptName]}
                        toggleDept={this.toggleDeptChecked}
                        togglePos={this.togglePosChecked}
                    />
                </li>
            );
        }.bind(this));
        
        return (
            <div>
                <div className='notification-head'>
                    <span>招聘职位</span>
                    <span className='right' onClick={this.clearAllChecked}>清空</span>
                </div>

                <div className='notification-body'>
                    <ul className='department-list'>
                        {deptList}
                    </ul>
                </div>
            </div>
        );
    }
});

var Department = React.createClass({
    getInitialState: function() {
        return {
            collapsed: true
        };
    },

    toggleCollapsed: function() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    },

    toggleDeptChecked: function() {
        return function() {
            this.props.toggleDept(this.props.deptName);
        }.bind(this);
    },

    togglePosChecked: function(posName) {
        return function() {
            this.props.togglePos(this.props.deptName, posName);
        }.bind(this);
    },
    
    render: function () {
        var countSum = Object.keys(this.props.posCount).reduce(function (sum, posName) {
            return sum + this.props.posCount[posName];
        }.bind(this), 0);

        var collapsedIcon = this.state.collapsed ? 'icon-chevron-right' : 'icon-chevron-down';

        var checkedIcon = this.props.checked ? 'icon-check' : 'icon-check-empty';

        var checkedClass = this.props.checked ? ' checked' : '';

        var posList = Object.keys(this.props.posCount).map(function (posName) {
            return (
                <li>
                    <Position
                        posName={posName}
                        count={this.props.posCount[posName]}
                        checked={this.props.posChecked[posName]}
                        togglePosChecked={this.togglePosChecked(posName)}
                    />
                </li>
            );
        }.bind(this));

        return (
            <div className={'department' + checkedClass}>
                <div className='department-head'>
                    <i className={checkedIcon} onClick={this.toggleDeptChecked()}></i>
                    <span className='department-name'>{this.props.deptName}</span>
                    
                    <i className={collapsedIcon} onClick={this.toggleCollapsed}></i>
                    <span className='count padded'>{_utmost(countSum, 999)}</span>
                </div>

                <div className={'department-body' + (this.state.collapsed ? ' collapsed' : '')}>
                    <ul>
                        {posList}
                    </ul>
                </div>
            </div>
        );
    }
});

var Position = React.createClass({
    render: function () {
        var checkedIcon = this.props.checked ? 'icon-check' : 'icon-check-empty';
        var checkedClass = this.props.checked ? ' checked' : '';

        return (
            <div className={'position' + checkedClass}>
                <i className={checkedIcon} onClick={this.props.togglePosChecked}></i>
                
                <span>{this.props.posName}</span>

                <div className='count'>{_utmost(this.props.count, 999)}</div>
            </div>
        );
    }
});

module.exports = NotificationPanel;
