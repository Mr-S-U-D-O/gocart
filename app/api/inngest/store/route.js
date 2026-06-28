import { getAuth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// create the store
export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        //Get the data from form
        const formData = await request.formData()

        const name = formData("name")
        const username = formData("username")
        const description = formData("description")
        const email = formData("email")
        const contact = formData("contact")
        const image = formData("image")
        const address = formData("address")
      
        if (!name || !username || !description || !email || !contact || !image || !address) {
            return NextResponse.json(
                {
                    error: "Missing store information",
                },
                { status: 400 }
            );
            

        }

        // check if user has a store
        const store = await prisma.store.findFirst({
            where: {
                userId: userId
            }
        })
        
        // if store is already registered
        if (store) {
            return NextResponse.json({ store: store.status }
            )
        
        }

        //check if username is already taken 
        const isUsernameTaken = await prisma.store.findFirst({
            where: {
                username: username.toLowerCase()
            }
        })

        if (isUsernameTaken) {
            return NextResponse.json({
                error: "Username already taken",
            },{status: 400})
        }

        
    } catch (error) {}
}
