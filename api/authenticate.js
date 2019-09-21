const bcrypt = require("bcrypt");
const saltRounds = 15;


module.exports = async (req, res, db)=>{
   try{
        let response = {data:null, message:""}, status = 200;
        const { url, body } = req;

        if(url === "/api/authenticate/login"){
            const { email, password } = body;
            if(!email || !password){
                response.message = "Email and Password Required!";
                return res.json(JSON.stringify(response), status);
            }

            const user = await db.getOne("users", { email });

            if(!user){
                response.message = "Incorrect Email!"
                return res.json(JSON.stringify(response), status);
            }

            const match = await bcrypt.compare(password, user.password);
    
            if(!match) {
                response.message = "Incorrect Password!"
                return res.json(JSON.stringify(response), status);            
            }else{
                response.message = "login sucesss";
                response.data = {
                    email:user.email,
                    name: user.name
                }
                return res.json(JSON.stringify(response), status); 
            }
            

        }else if(url === "/api/authenticate/register"){
            const { name, password, email } = body;

            if(!name || !password || !email){
                response.message = "All fields are Required!";
                return res.json(JSON.stringify(response), status);
            }

            if(password.length < 4){
                response.message = "Password too short!";
                return res.json(JSON.stringify(response), status);
            }

            const user = await db.getOne("users", { email });

            if(user){
                response.message = `duplicate email "${email}"`;
                response.data = { email };
                return res.json(JSON.stringify(response), status);
            }

            const hashPassword = await bcrypt.hash(password, saltRounds);

            await db.insert("users", { 
                name,
                email,
                password:hashPassword
            })

            response.message = "User account created sucessfully";
            response.data = { email };
            res.json(JSON.stringify(response), status);

        }else{
            res.json(JSON.stringify({ message:"route not found" }), 404);
        }
   }catch(e){
        res.json(JSON.stringify({ message:"Server Error", data:null }), 500);
   }
}