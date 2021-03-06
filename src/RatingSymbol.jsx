import React from 'react';
import PropTypes from 'prop-types';

// Return the corresponding React node for an icon.
const _iconNode = (icon, extraProps = {}) => {
  // If it is already a React Element just return it.
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, extraProps);
  }
  // If it is an object, try to use it as a CSS style object.
  if (typeof icon === 'object' && icon !== null) {
    return <span style={icon} />;
  }
  // If it is a string, use it as class names.
  if (Object.prototype.toString.call(icon) === '[object String]') {
    return <span className={icon} />;
  }
};

class RatingSymbol extends React.PureComponent {
  render() {
    const {
      index,
      inactiveIcon,
      activeIcon,
      percent,
      direction,
      readonly,
      onClick,
      onMouseMove,
      displayValue
    } = this.props;
    const backgroundNode = _iconNode(inactiveIcon);
    const iconNode = _iconNode(activeIcon, {displayValue});
    const iconContainerStyle = {
      display: 'inline-block',
      position: 'absolute',
      overflow: 'hidden',
      top: 0,
      [direction === 'rtl' ? 'right' : 'left']: 0,
      width: `${percent}%`
    };
    const style = {
      cursor: !readonly ? 'pointer' : 'auto',
      display: 'inline-block',
      position: 'relative'
    };

    function handleMouseMove(e) {
      if (onMouseMove) {
        onMouseMove(index, e);
      }
    }

    function handleMouseClick(e) {
      if (onClick) {
        onClick(index, e);
      }
    }

    return (
      <span
        style={style}
        onClick={handleMouseClick}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseClick}
      >
        {backgroundNode}
        <span style={iconContainerStyle}>
          {iconNode}
        </span>
      </span>
    );
  }
}

// Define propTypes only in development. They will be void in production.
RatingSymbol.propTypes = typeof __DEV__ !== 'undefined' && __DEV__ && {
  index: PropTypes.number.isRequired,
  readonly: PropTypes.bool.isRequired,
  inactiveIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element
  ]).isRequired,
  activeIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element
  ]).isRequired,
  percent: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onMouseMove: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
  displayValue: PropTypes.number
};

export default RatingSymbol;
