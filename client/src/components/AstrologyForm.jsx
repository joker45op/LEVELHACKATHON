import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useRouter
import { useAppContext } from "../context/AppContext";

const AstrologyForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    hours: "",
    minutes: "",
    seconds: "",
    city: "",
    state: "",
  });
  const { updateResponseData } = useAppContext()
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([
    "Andhra Pradesh",
    "Bihar",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // Form submit loading state

  const router = useNavigate(); // Initialize useRouter

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "hours" || name === "minutes" || name === "seconds") {
      setFormData({ ...formData, [name]: value ? parseInt(value, 10) : "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const requestData = {
      fname: formData.firstName,
      lname: formData.lastName,
      gender: formData.gender,
      year: new Date(formData.dob).getFullYear(),
      month: new Date(formData.dob).getMonth() + 1,
      date: new Date(formData.dob).getDate(),
      hours: formData.hours,
      minutes: formData.minutes,
      seconds: formData.seconds,
      city: formData.city,
      output_dir: "imgs",
    };

    try {
      const response = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (result) {
        console.log("Response from server:", result);
        // Redirect to another page after receiving the response
        updateResponseData(result)
        router("/data"); // Change this to the desired path
      }
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (formData.state) {
      fetchCities(formData.state);
    }
  }, [formData.state]);

  const fetchCities = async (state) => {
    const cityData = getCitiesForState(state);
    if (cityData) {
      setCities(cityData);
    } else {
      const apiUrl = `https://api.example.com/cities?state=${state}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCities(data.cities || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setIsLoading(false);
      }
    }
  };

  const getCitiesForState = (state) => {
    switch (state) {
      case "Maharashtra":
        return ["Mumbai", "Pune", "Nagpur", "Nashik"];
      case "Gujarat":
        return ["Ahmedabad", "Rajkot", "Vadodara"];
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center mb-5">
      <div
        className="max-w-lg p-6 rounded-lg shadow-md"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
      >
        <h1 className="text-2xl font-semibold mb-7">
          Astrology Birth Info Form
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-white text-left ml-2 font-medium"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 w-full text-black border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-white text-left ml-2 font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 w-full text-black border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-white text-left ml-2 font-medium"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 p-2 w-full text-black border rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block text-white text-left ml-2 font-medium"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 p-2 w-full text-black border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="birthTime"
              className="block text-white text-left ml-2 font-medium"
            >
              Time of Birth
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                id="hours"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                placeholder="HH"
                className="p-2 w-1/3 border rounded-md"
              />
              <input
                type="number"
                id="minutes"
                name="minutes"
                value={formData.minutes}
                onChange={handleChange}
                placeholder="MM"
                className="p-2 w-1/3 border rounded-md"
              />
              <input
                type="number"
                id="seconds"
                name="seconds"
                value={formData.seconds}
                onChange={handleChange}
                placeholder="SS"
                className="p-2 w-1/3 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="state" className="block text-white text-left ml-2">
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 p-2 w-full text-black border rounded-md"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-white text-left ml-2">
              City
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 p-2 w-full text-black border rounded-md"
              disabled={!formData.state}
            >
              <option value="">Select City</option>
              {isLoading ? (
                <option value="">Loading...</option>
              ) : cities.length > 0 ? (
                cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))
              ) : (
                <option value="">No cities available</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-2 mt-3 bg-white text-black border-2 font-semibold rounded-md hover:bg-[#121212] hover:text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit"}{" "}
            {/* Show loading text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AstrologyForm;
