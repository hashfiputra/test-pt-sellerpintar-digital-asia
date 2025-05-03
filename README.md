# The Journal

This is my implementation code for the Figma design of a web article. My live 👉🏻[website](https://the-journal-hp.vercel.app/)👈🏻

## 🚀 Technologies Used

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js 15](https://nextjs.org/docs/getting-started)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [usehooks-ts](https://usehooks-ts.com/introduction) 👉🏻 Used for useful hooks, debounce, etc.
- [react-timeago](https://github.com/nmn/react-timeago) 👉🏻 Used for relative time in-real time component
- [react-dropzone](https://react-dropzone.js.org/) 👉🏻 Used for input file dropzone
- [axios](https://axios-http.com/)
- [zod](https://zod.dev/)

## 📖 How to Use

### Clone this repo

```bash
git clone <repo>
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## 😃 Things I add/change

List of things I add or change from the design:

- Expandable/Collapsable sidebar in admin page built with `shadcn/ui`
- A reset button on filter category since if it's already selected, only way to reset is to refresh the page
- A login/logout navigation on home header
- Removed other articles section in preview article, since for me it doesn't make sense for preview have a recommendation
- Dropdown account detail (menu in account for logging out and go to profile) is scrollable instead of scroll lock, since I think it's more UI friendly
- Removed `password` field in user profile page, since I don't think it's a good idea to show the password there (or even anywhere in client side), replaced with field `joined at` instead
- Added UI for empty state on articles, UI for loading state in button, UI for toast error/success message when requesting API
- And maybe some other minor things I forgot to mention here...

## 😔 Things I miss

List of things I miss/work in progress:

- The text rich input in creating/editing article, I can't seems find a good library to use for this, most of the library out there need to be tweaked/style alot, with the time I had I don't have that kind of luxury
- Making dummy data for backup from API, I can't seem to find the time to make this
