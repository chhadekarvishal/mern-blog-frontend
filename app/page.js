import BlogList from "@/components/BlogList";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="p-4">
        <BlogList />
      </div>
      <Footer copyright="EZZY Blog" />
    </>
  );
}
