export default function CarCard({ car, onAddToWishlist }) {
    return (
      <div className="border rounded p-4 shadow-md">
        <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded" />
        <h2 className="text-lg font-bold">{car.name}</h2>
        <p>Brand: {car.brand}</p>
        <p>Price: ${car.price}</p>
        <p>Fuel Type: {car.fuelType}</p>
        <button
          onClick={() => onAddToWishlist(car)}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add to Wishlist
        </button>
      </div>
    );
  }
  