namespace :pop do
  desc "Populates careers and people who have those careers"
  task carrers: :environment do
    30.times do
      career = Career.create(
      title: Faker::Job.title,
      field: Faker::Job.field
      )
      10.times do
        Person.create(
        name: Faker::Name.name,
        age: Faker::Number.between(20, 78),
        career_id: career.id
        )
      end
    end
  end

end
