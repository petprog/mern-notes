import { Link } from "react-router-dom";

export default function Public() {
  const content = (
    <section className="flex flex-grow flex-col">
      <header className="bg-gray-900 p-4">
        <h1 className="text-xl md:text-2xl  font-semibold">
          Welcome to <span className="whitespace-nowrap">Dan D. Repairs!</span>
        </h1>
      </header>
      <main className="flex-grow border-t-2 border-b-2 border-dark p-4">
        <p>
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>
        <address className="mt-4">
          Dan D. Repairs
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Dan Davidson</p>
      </main>
      <footer className="bg-gray-900 p-4">
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
}
