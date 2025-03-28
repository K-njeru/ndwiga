'use client';

export function WhatIDo() {
  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">What I Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-card rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Frontend Development</h3>
            <p className="text-muted-foreground">
              Creating responsive and interactive user interfaces
            </p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Backend Development</h3>
            <p className="text-muted-foreground">
              Building scalable server-side applications
            </p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">UI/UX Design</h3>
            <p className="text-muted-foreground">
              Designing intuitive user experiences
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}