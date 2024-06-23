"use client";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface CourseFeedbackProps {
	course: Course & {
		chapters: (Chapter & {
			userProgress: UserProgress[] | null;
		})[];
	};
	progressCount: number;
}

export const CourseFeedback: React.FC<CourseFeedbackProps> = ({
	course,
	progressCount,
}) => {
	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
	const [getfeedback, setFeedback] = useState({
		name: "",
		email: "",
		feedback: "",
	});

	const onSubmitFeedback = async () => {
		const response = await axios.put(`/api/feedback`, {
			...getfeedback,
			courseId: course.id,
		});
		setFeedback({
			name: "",
			email: "",
			feedback: "",
		});
		toast.success("Feedback Submitted");
		setIsFeedbackOpen(!isFeedbackOpen);
	};

	return (
		<div
			className={`${
				isFeedbackOpen ? "p-4" : "p-2"
			} px-4 align-middle text-center cursor-pointer w-full border-slate-300 border-2 rounded-md duration-300 bg-white`}>
			{isFeedbackOpen && (
				<div className="flex flex-col gap-1 duration-300">
					<input
						value={getfeedback.email}
						name="email"
						placeholder="Email"
						className="w-full p-2 px-4 border-slate-200 border-2 rounded-md"
						onChange={(event) =>
							setFeedback({
								...getfeedback,
								email: event.target.value,
							})
						}
					/>
					<input
						value={getfeedback.name}
						name="name"
						placeholder="Name"
						className="w-full p-2 px-4 border-slate-200 border-2 rounded-md"
						onChange={(event) =>
							setFeedback({
								...getfeedback,
								name: event.target.value,
							})
						}
					/>
					<textarea
						value={getfeedback.feedback}
						name="Feedback"
						placeholder="Write your feedback here"
						className="w-full p-2 px-4 border-slate-200 border-2 rounded-md resize-none"
						onChange={(event) =>
							setFeedback({
								...getfeedback,
								feedback: event.target.value,
							})
						}
					/>
					<button
						className="w-full bg-green-700 text-white p-2 px-4 mt-1 rounded-md"
						onClick={onSubmitFeedback}>
						Submit
					</button>
				</div>
			)}
			<button
				className={
					isFeedbackOpen
						? "w-full border-slate-300 border-2 p-2 px-4 mt-1 rounded-md"
						: "w-full"
				}
				onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}>
				{isFeedbackOpen ? "Close Feedback" : "Feedback"}
			</button>
		</div>
	);
};
