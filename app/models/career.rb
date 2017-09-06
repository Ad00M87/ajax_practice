class Career < ApplicationRecord
  has_many :people, dependent: :destroy
  validates_presence_of :title
end
