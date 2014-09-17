# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

categories = ['Story', 'Song', 'Poem']
categories.each do |category|
  Category.create!(name: category)
end

5.times do
  name = Faker::Name.name
  User.create!(name: name, email: Faker::Internet.email(name), password: "password", password_confirmation: "password")
end

User.find_each do |user|
  user.projects.create!(name: Faker::Lorem.sentence, category_id: rand(1..3))
end

Project.find_each do |project|
  contributor_id = project.initiator.id
  intial_version = Version.create!(insertion_index: -1, previous_version_id: nil, contributor_id: contributor_id, contribution: Faker::Lorem.sentence, project_id: project.id)
  10.times do
    previous_id = project.versions.last.id
    project.versions.create!(insertion_index: -1, previous_version_id: previous_id, contributor_id: rand(1..5), contribution: Faker::Lorem.sentence)
    project.votes.create!(user_id: rand(1..5), positive: [true, false].sample)
  end
end

Version.find_each do |version|
  5.times do
    version.votes.create!(user_id: rand(1..5), positive: [true, false].sample)
  end
end
