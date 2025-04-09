import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';
import Pagination from '../components/Pagination';
import 'tailwindcss/tailwind.css';
import Footer from '../components/Footer';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');

  // Define handleSearch inside the Home component
  const handleSearch = (searchTerm, selectedBrand, selectedPriceRange, selectedFuelType) => {
    let filtered = cars;

    if (searchTerm) {
      filtered = filtered.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter((car) => car.brand === selectedBrand);
    }

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter((car) => car.price >= minPrice && car.price <= maxPrice);
    }

    if (selectedFuelType) {
      filtered = filtered.filter((car) => car.fuelType === selectedFuelType);
    }

    setFilteredCars(filtered);
    setCurrentPage(1);
  };

  // Use useEffect to apply filters and search
  useEffect(() => {
    handleSearch(searchTerm, selectedBrand, selectedPriceRange, selectedFuelType);
  }, [searchTerm, selectedBrand, selectedPriceRange, selectedFuelType, cars]); // Added cars to the dependency array

  useEffect(() => {
    axios.get('/cars.json').then((response) => {
      setCars(response.data);
      setFilteredCars(response.data);
    });
  }, []);

  const handleAddToWishlist = (car) => {
    const updatedWishlist = [...wishlist, car];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * carsPerPage;
  const paginatedCars = filteredCars.slice(startIndex, startIndex + carsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onSearch={(term) => setSearchTerm(term)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Cars</h1>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="">All Brands</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
          </select>

          {/* Price Range Filter */}
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="">All Prices</option>
            <option value="0-20000">Under $20,000</option>
            <option value="20000-40000">$20,000 - $40,000</option>
            <option value="40000-60000">$40,000 - $60,000</option>
          </select>

          {/* Fuel Type Filter */}
          <select
            value={selectedFuelType}
            onChange={(e) => setSelectedFuelType(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Cars Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCars.length / carsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
