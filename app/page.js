import BlogList from "@/components/BlogList";
import LoginForm from "@/components/LoginForm";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold"></h1>
          <ThemeSwitcher />
        </div>
        <BlogList />
      </div>
    </>
  );
}
