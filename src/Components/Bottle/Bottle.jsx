import PropTypes from 'prop-types';
import './Bottle.css'

const Bottle = ({ bottle, handleCart }) => {
    // console.log(bottle);
    // console.log(handleCart);
    const { name, img, price } = bottle;
    return (
        <div className='bottle'>
            <h5>Bottle: {name}</h5>
            <img src={img} alt="" />
            <p>Price: ${price}</p>
            <button onClick={() => handleCart(bottle)}>Make Purchase</button>
        </div>
    );
};

Bottle.propTypes = {
    bottle: PropTypes.object.isRequired,
    handleCart: PropTypes.func
}
export default Bottle;