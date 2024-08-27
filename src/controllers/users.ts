import { db } from "@/db/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
	const {
		username,
		email,
		phone,
		password,
		firstName,
		lastName,
		dob,
		gender,
		image,
	} = req.body;

	try {
		//Check for Form valdiation
		//Check if user already exists
		const existingUserByEmail = await db.user.findUnique({
			where: {
				email,
			},
		});
		const existingUserByPhone = await db.user.findUnique({
			where: {
				phone,
			},
		});
		const existingUserByUsername = await db.user.findUnique({
			where: {
				username,
			},
		});
		if (existingUserByEmail) {
			return res.status(409).json({
				error: `Email (${email}) Already taken`,
				data: null,
			});
		}
		if (existingUserByPhone) {
			return res.status(409).json({
				error: `Phone Number (${phone}) Already taken`,
				data: null,
			});
		}
		if (existingUserByUsername) {
			return res.status(409).json({
				error: `${username} Already taken`,
				data: null,
			});
		}
		//hash the password
		const hashedPassword = await bcrypt.hash(password, 10);
		//Create User
		const newUser = await db.user.create({
			data: {
				username,
				email,
				phone,
				password: hashedPassword,
				firstName,
				lastName,
				dob,
				gender,
				image: image
					? image
					: "https://cdn.pixabay.com/photo/2016/03/01/11/07/paper-1230086_640.jpg",
			},
		});

		res.status(201).json({
			data: newUser,
			error: null,
		});

		//Modify the returned User
	} catch (error) {
		console.log(error);
	}
}
