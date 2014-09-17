FactoryGirl.define do
  factory :user do |f|
    faker_name = Faker::Name.name
    f.name {faker_name}
    f.email {Faker::Internet.email(faker_name)}
  end
end
