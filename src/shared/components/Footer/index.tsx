export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full items-center justify-between p-6 bg-gray-50 fixed bottom-0 left-0">
      <span className="text-sm text-gray-300">© Google {currentYear}</span>
      <span className="text-sm text-gray-300">version 0.1.0</span>
    </footer>
  );
}
