import MonthView from "../components/Calendar/MonthView";
// import { supabaseAdmin } from "@/lib/supabase";

export default function Home() {
  /*   const setNewView = async () => {
    const { data, error } = await supabaseAdmin.from("views").insert({
      name: "random name",
    });
    if (data) console.log(data);
    if (error) console.log(error);
  }; */

  // setNewView();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <MonthView />
    </main>
  );
}
