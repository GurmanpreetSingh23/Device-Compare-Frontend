import React from "react";
import Header from "../components/Header";
import FilterSection from "../components/FilterSection";
import DevicesMenu from "../components/DevicesMenu";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <main className="w-full min-h-screen bg-no-repeat bg-cover flex flex-col px-2 md:px-8 space-y-4 py-6">
        <Header />
        <FilterSection />

        <hr className="border  border-black/50" />

        <DevicesMenu />
      </main>
      <Footer />
    </>
  );
}

export default Home;
