"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var VideoSeekSlider = (function (_super) {
    __extends(VideoSeekSlider, _super);
    function VideoSeekSlider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            ready: false,
            trackWidth: 0,
            seekHoverPosition: 0,
            seeking: false,
            mobileSeeking: false
        };
        _this.handleTouchSeeking = function (event) {
            var pageX = 0;
            for (var i = 0; i < event.changedTouches.length; i++) {
                pageX = event.changedTouches[i].pageX;
            }
            pageX = pageX < 0 ? 0 : pageX;
            if (_this.state.mobileSeeking) {
                _this.changeCurrentTimePosition(pageX);
            }
        };
        _this.handleSeeking = function (event) {
            if (_this.state.seeking) {
                _this.changeCurrentTimePosition(event.pageX);
            }
        };
        _this.setTrackWidthState = function () {
            if (_this.track) {
                _this.setState({
                    trackWidth: _this.track.offsetWidth
                });
            }
        };
        _this.handleTrackHover = function (clear, e) {
            var position = e.pageX - _this.track.getBoundingClientRect().left;
            if (clear) {
                position = 0;
            }
            _this.setState({
                seekHoverPosition: position
            });
        };
        _this.setSeeking = function (state, event) {
            _this.handleSeeking(event);
            _this.setState({
                seeking: state,
                seekHoverPosition: !state ? 0 : _this.state.seekHoverPosition
            });
        };
        _this.setMobileSeeking = function (state) {
            _this.setState({
                mobileSeeking: state,
                seekHoverPosition: !state ? 0 : _this.state.seekHoverPosition
            });
        };
        return _this;
    }
    VideoSeekSlider.prototype.componentDidMount = function () {
        this.setTrackWidthState();
        window.addEventListener('resize', this.setTrackWidthState);
        window.addEventListener('mousemove', this.handleSeeking);
        window.addEventListener('mouseup', this.setSeeking.bind(this, false));
        window.addEventListener('touchmove', this.handleTouchSeeking);
        window.addEventListener('touchend', this.setMobileSeeking.bind(this, false));
    };
    VideoSeekSlider.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.setTrackWidthState);
        window.removeEventListener('mousemove', this.handleSeeking);
        window.removeEventListener('mouseup', this.setSeeking.bind(this, false));
        window.removeEventListener('touchmove', this.handleTouchSeeking);
        window.removeEventListener('touchend', this.setMobileSeeking.bind(this, false));
    };
    VideoSeekSlider.prototype.changeCurrentTimePosition = function (pageX) {
        var position = pageX - this.track.getBoundingClientRect().left;
        position = position < 0 ? 0 : position;
        position = position > this.state.trackWidth ? this.state.trackWidth : position;
        this.setState({
            seekHoverPosition: position
        });
        var percent = position * 100 / this.state.trackWidth;
        var time = +(percent * (this.props.max / 100)).toFixed(0);
        this.props.onChange(time);
    };
    VideoSeekSlider.prototype.getPositionStyle = function (time) {
        var position = time * 100 / this.props.max;
        return {
            transform: 'scaleX(' + position / 100 + ')'
        };
    };
    VideoSeekSlider.prototype.getThumbHandlerPosition = function () {
        var position = this.state.trackWidth / (this.props.max / this.props.currentTime);
        return {
            transform: 'translateX(' + position + 'px)'
        };
    };
    VideoSeekSlider.prototype.getSeekHoverPosition = function () {
        var position = this.state.seekHoverPosition * 100 / this.state.trackWidth;
        return {
            transform: 'scaleX(' + position / 100 + ')'
        };
    };
    VideoSeekSlider.prototype.getHoverTimePosition = function () {
        var position = 0;
        if (this.hoverTime) {
            position = this.state.seekHoverPosition - this.hoverTime.offsetWidth / 2;
        }
        return {
            transform: 'translateX(' + position + 'px)'
        };
    };
    VideoSeekSlider.prototype.secondsToTime = function (seconds) {
        seconds = Math.round(seconds);
        var hours = Math.floor(seconds / 3600);
        var divirsForMinutes = seconds % 3600;
        var minutes = Math.floor(divirsForMinutes / 60);
        var sec = Math.ceil(divirsForMinutes % 60);
        return {
            hh: hours.toString(),
            mm: minutes < 10 ? "0" + minutes : minutes.toString(),
            ss: sec < 10 ? "0" + sec : sec.toString()
        };
    };
    VideoSeekSlider.prototype.getHoverTime = function () {
        var percent = this.state.seekHoverPosition * 100 / this.state.trackWidth;
        var time = +(percent * (this.props.max / 100)).toFixed(0);
        if (this.props.max < 60) {
            return '0:' + time;
        }
        else if (this.props.max < 3600) {
            var times = this.secondsToTime(time);
            return times.mm + ':' + times.ss;
        }
        else {
            var times = this.secondsToTime(time);
            return times.hh + ':' + times.mm + ':' + times.ss;
        }
    };
    VideoSeekSlider.prototype.isThumbActive = function () {
        if (this.state.seekHoverPosition > 0 || this.state.seeking) {
            return true;
        }
        return false;
    };
    VideoSeekSlider.prototype.drawHoverTime = function () {
        var _this = this;
        if (!this.props.hideHoverTime) {
            return (React.createElement("div", { className: this.isThumbActive() ? "hover-time active" : "hover-time", style: this.getHoverTimePosition(), ref: function (ref) { return _this.hoverTime = ref; } }, this.getHoverTime()));
        }
    };
    VideoSeekSlider.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "ui-video-seek-slider" },
            React.createElement("div", { className: this.isThumbActive() ? "track active" : "track", ref: function (ref) { return _this.track = ref; }, onMouseMove: this.handleTrackHover.bind(this, false), onMouseLeave: this.handleTrackHover.bind(this, true), onMouseDown: this.setSeeking.bind(this, true), onTouchStart: this.setMobileSeeking.bind(this, true) },
                React.createElement("div", { className: "main" },
                    React.createElement("div", { className: "buffered", style: this.getPositionStyle(this.props.progress) }),
                    React.createElement("div", { className: "seek-hover", style: this.getSeekHoverPosition() }),
                    React.createElement("div", { className: "connect", style: this.getPositionStyle(this.props.currentTime) }))),
            this.drawHoverTime(),
            React.createElement("div", { className: this.isThumbActive() ? "thumb active" : "thumb", style: this.getThumbHandlerPosition() },
                React.createElement("div", { className: "handler" }))));
    };
    return VideoSeekSlider;
}(React.Component));
VideoSeekSlider.defaultProps = {
    max: 100,
    currentTime: 0,
    progress: 0,
    hideHoverTime: false
};
exports.VideoSeekSlider = VideoSeekSlider;
