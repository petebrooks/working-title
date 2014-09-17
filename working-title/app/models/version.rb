class Version < ActiveRecord::Base
  belongs_to :project
  belongs_to :contributor, class_name: "User"
  belongs_to :previous_version, class_name: "Version"
  has_many :votes, as: :voteable
end
