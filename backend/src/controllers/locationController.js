const pool = require("../../db");

const getDivisions = async (req, res) => {
  try {
    const divisions = await pool.query("SELECT division_id, division_name FROM divisions");
    res.status(200).json(divisions.rows);
  } catch (error) {
    console.error("Error fetching divisions:", error.message);
    res.status(500).json({ message: "An error occurred while fetching divisions." });
  }
};


const getDistrictsByDivision = async (req, res) => {
  const { divisionId } = req.params;
  
  try {
    const districts = await pool.query("SELECT district_id, district_name FROM districts WHERE division_id = $1", [divisionId]);
    res.status(200).json(districts.rows);
  } catch (error) {
    console.error("Error fetching districts:", error.message);
    res.status(500).json({ message: "An error occurred while fetching districts." });
  }
};

const getUpazilasByDistrict = async (req, res) => {
    const { districtId } = req.params;
    
    try {
      const upazilas = await pool.query("SELECT upazila_id, upazila_name FROM upazilas WHERE district_id = $1", [districtId]);
      res.status(200).json(upazilas.rows);
    } catch (error) {
      console.error("Error fetching upazilas:", error.message);
      res.status(500).json({ message: "An error occurred while fetching upazilas." });
    }
  };
  
  

module.exports = { getDivisions,getDistrictsByDivision,getUpazilasByDistrict };
