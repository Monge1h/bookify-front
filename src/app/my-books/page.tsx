import { Button } from "@/components/ui/button";

export default function MyBooksPage() {
  return (
	<section>
		<div className="flex justify-between">
			<h1 className="text-4l font-bold">My Books</h1>
			<Button>Add</Button>
		</div>
	</section>
  )
}