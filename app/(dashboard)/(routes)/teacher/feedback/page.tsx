"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const Feedbackpage = () => {
	const [userFeedback, setUserFeedback] = useState([]);
	const [courses, setCourses] = useState([]);
	useEffect(() => {
		const fetchFeedback = async () => {
			try {
				const response = await axios.get("/api/feedback");
				const courseDetails = (await axios.get(`/api/courses`)).data;
				setCourses(courseDetails);
				setUserFeedback(response.data);
			} catch (error) {
				console.error("Error fetching feedback:", error);
			}
		};

		fetchFeedback();
	}, []);
	const deleteFeedback = async (feedBackId: any) => {
		const data: { id: string } = { id: feedBackId };
		await axios.delete("/api/feedback", { data });
		const updatedFeedback = userFeedback.filter(({ id }) =>
			id !== feedBackId
		);
		console.log(updatedFeedback);
		setUserFeedback(updatedFeedback);
	};
	return (
		<div className="flex flex-row flex-wrap gap-2 p-4">
			{userFeedback.map(({ id, courseId, name, email, feedback }) => {
				const course = courses?.filter(
					({ id }) => id === courseId
				)?.[0];
				const { title } = course;
				return (
					<div
						key={id}
						className="relative border-2 p-2 border-slate-200 rounded-sm flex flex-col w-full sm:w-[300px] min-w-[200px] gap-4 overflow-hidden">
						<div>
							{name}
							<br />
							{email}
						</div>
						<div>
							{title}
							<br />
							{feedback}
						</div>
						<button
							className="absolute bg-red-300 text-black rounded-md p-2 top-1 right-1"
							onClick={() => deleteFeedback(id)}>
							<Trash2 size={16} />
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default Feedbackpage;
