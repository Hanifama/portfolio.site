import { useState, useEffect } from "react";
import { Star } from "@phosphor-icons/react";

interface Rating {
    name: string;
    rating: number;
    comment: string;
}

export default function RatingSystem() {
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [name, setName] = useState<string>("");
    const [newRating, setNewRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [showRating, setShowRating] = useState<boolean>(false);

    useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then((data: { ratings: Rating[] }) => setRatings(data.ratings || []))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        const footer = document.getElementById("footer");

        if (!footer) return;

        const observer = new IntersectionObserver(
            (entries) => {
                setShowRating(entries[0].isIntersecting);
            },
            { threshold: 0.3 } // Muncul ketika 30% footer terlihat
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async () => {
        if (newRating === 0 || comment.trim() === "" || name.trim() === "") return;

        const updatedRatings: Rating[] = [...ratings, { name, rating: newRating, comment }];
        setRatings(updatedRatings);
        setNewRating(0);
        setComment("");
        setName("");

        try {
            const response = await fetch("/api/save-rating", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ratings: updatedRatings }),
            });

            if (!response.ok) throw new Error("Failed to save rating");

            console.log("Rating saved!");
        } catch (error) {
            console.error("Error saving rating:", error);
        }
    };

    const averageRating =
        ratings.length > 0
            ? (ratings.reduce((acc, item) => acc + item.rating, 0) / ratings.length).toFixed(1)
            : "0.0";

    return (
        <>
            {showRating && (
                <div className="fixed bottom-4 right-1/4 bg-white p-4 rounded-xl shadow-xl w-80 border border-gray-300">
                    <h2 className="text-lg text-gray-800 font-semibold mb-2">Beri Rating</h2>

                    <input
                        type="text"
                        className="w-full p-3 border border-gray-400 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Nama Anda"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="flex gap-1 my-3">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <Star
                                key={num}
                                size={24}
                                className={`cursor-pointer ${newRating >= num ? "text-yellow-500" : "text-gray-300"
                                    }`}
                                onClick={() => setNewRating(num)}
                            />
                        ))}
                    </div>

                    <textarea
                        className="w-full p-3 border border-gray-400 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                        placeholder="Tulis komentar..."                        
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button
                        className="w-full bg-yellow-500 text-white p-3 mt-3 rounded font-medium hover:bg-yellow-600 transition-all"
                        onClick={handleSubmit}
                    >
                        Kirim
                    </button>

                    <p className="mt-3 text-gray-600 text-sm">
                        Rating {averageRating} (from {ratings.length} voters)
                    </p>
                </div>
            )}
        </>

    );
}
