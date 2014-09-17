class Project < ActiveRecord::Base
  belongs_to :category
  belongs_to :initiator, class_name: "User"
  has_many :votes, as: :voteable
  has_many :versions
end
