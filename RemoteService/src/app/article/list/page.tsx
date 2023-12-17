import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: 'Articles - Blog'
};

export default function Page() {
	return (
		<div className="card">
			<h2 className="font-serif text-2xl">Articles</h2>
		</div>
	)
}
