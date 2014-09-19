class User < ActiveRecord::Base
  has_many :projects, foreign_key: "initiator_id"
  has_many :versions, foreign_key: "contributor_id"
  has_many :votes, foreign_key: "user_id"

  has_secure_password
end