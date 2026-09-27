const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapTocan = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapTocan });

module.exports.index = async(req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.editListing = async(req,res)=>{
    let {id} = req.params;
    const data = await Listing.findById(id);
    return res.render("listings/edit",{data});
};

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const listingData = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!listingData){
        req.flash("error","listing you requested for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listingData});
};

module.exports.createNewListing = async(req,res)=>{
    console.log(req.body);
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 2,
    }).send();

    let url = req.file.path;
    let filename = req.file.filename;
    let newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    
    newlisting.geometry = response.body.features[0].geometry;
 
    await newlisting.save();
    req.flash("success","New listing created!");
    res.redirect("/listings");
};

module.exports.updateListing = async(req,res)=>{
    let id = req.params.id;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","listing Updated!");
    res.redirect("/listings");
};

module.exports.deleteListing = async(req,res)=>{
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing Deleted!");
    res.redirect("/listings");
};