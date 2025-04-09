import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';
import Pagination from '../components/Pagination';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Footer from '../components/Footer';


export default function Home() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  useEffect(() => {
    axios.get('/cars.json').then((response) => {
      setCars(response.data);
      setFilteredCars(response.data);
    });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = cars.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(filtered);
    setCurrentPage(1);
  };

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
      <Navbar onSearch={handleSearch} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Cars</h1>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCars.length / carsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
