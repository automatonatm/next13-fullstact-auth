import prisma from "@/app/lib/prisma"
import  * as bcrypt from "bcrypt"

interface RequestBody {
    email: string,
    password: string
}

export async function POST(request: Request) {
    
    const body: RequestBody = await request.json()

    const {email, password} = body

    const user = await prisma.user.findFirst({
        where: {
            email,
        
        }
    })

    const comparePassword = await bcrypt.compare(password, user.password)

    if(user &&  comparePassword) {

        const {password, ...userWithoutPass} =  user

        return  new Response(JSON.stringify(userWithoutPass))
    }else {
        return new Response(JSON.stringify(null));
    }




}