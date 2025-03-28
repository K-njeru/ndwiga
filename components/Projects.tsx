'use client';

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-card rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Project 1</h3>
            <p className="text-muted-foreground">
              Description of project 1
            </p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Project 2</h3>
            <p className="text-muted-foreground">
              Description of project 2
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}