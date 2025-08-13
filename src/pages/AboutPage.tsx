interface Person {
  name: string;
  role: string;
  photoUrl: string;
  githubUrl: string;
}

const person: Person = {
  name: 'Yuliya',
  role: 'Frontend Developer',
  photoUrl:
    'https://46f32a42-e4ff-489b-8e03-b52e4d70fd18.selcdn.net/i/webp/bd/0b535c0940e86a9602bbfbe417fd9f.webp',
  githubUrl: 'https://github.com/YuliyaNaletskaya',
};

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center team-card">
            <img
              src={person.photoUrl}
              alt={`${person.name}'s photo`}
              className="image w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold">{person.name}</h3>
            <p className="text-gray-600">{person.role}</p>
            <a
              href={person.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-green-500 underline mt-2 inline-block"
            >
              GitHub profile
            </a>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">RS School</h2>
        <a
          href="https://rs.school/"
          target="_blank"
          rel="noopener noreferrer"
          className="link inline-block"
        >
          <img
            src="https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg"
            alt="RS School Logo"
            className="image w-48 mx-auto"
          />
        </a>
        <p className="text-gray-600 mt-4">
          Find out more about the training program on the website{' '}
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-green-500 underline"
          >
            RS School
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
