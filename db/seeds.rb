# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# categories = ['Story', 'Song', 'Poem']
# categories.each do |category|
#   Category.create!(name: category)
# end

# 5.times do
#   name = Faker::Name.name
#   User.create!(name: name, email: Faker::Internet.email(name), password: "password", password_confirmation: "password")
# end

User.find_each do |user|
  user.projects.create!(name: Faker::Lorem.sentence, category_id: rand(1..3), initial_text: Faker::Company.catch_phrase)
end

Project.find_each do |project|
  10.times do
    previous_id = project.versions.last.id
    v = project.versions.create!(insertion_index: -1, previous_version_id: previous_id, contributor_id: rand(1..5), contribution: Faker::Lorem.sentence)
    rand(2..4).times do
      v.children.create!(insertion_index: -1, contributor_id: rand(1..5), contribution: Faker::Lorem.sentence)
    end
    project.votes.create!(user_id: rand(1..5), positive: [true, false].sample)
  end
end

Version.find_each do |version|
  5.times do
    version.votes.create!(user_id: rand(1..5), positive: [true, false].sample)
  end
end
