// wrap is async function & automatically handle errors 
// by passing to EX error handling middleware 
module.exports = (fn)=>{
    return (req,res,next)=>{
        // execute the async function and
        // pass any error to next
        fn(req,res,next).catch(next);
    }
};