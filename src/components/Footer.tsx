/**
 * A functional component that renders a simple footer element.
 *
 * @returns A JSX.Element representing the footer element.
 */
const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-4 bg-gray-100 text-center text-sm">
      <p>&copy; {currentYear} Seth Balodi - Advocatr</p>
    </footer>
  );
};

export default Footer;
