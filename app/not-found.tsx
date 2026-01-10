export default function Custom404() {
  return (
    <main>
      <section className="px-4 md:px-8 lg:px-16 xl:px-20 flex my-16">
        <div className="w-full flex flex-col justify-center items-center gap-6 p-16 rounded-lg z-10">
          <h1 className="text-3xl font-semibold text-center  mb-5">
            404 - Page Not Found
          </h1>
          <p className=" text-lg leading-relaxed w-full md:w-1/2 text-center">
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </p>
        </div>
      </section>
    </main>
  );
}
